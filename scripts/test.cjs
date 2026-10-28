const { readdirSync } = require('node:fs')
const { join } = require('node:path')
const { run } = require('node:test')
const { tap } = require('node:test/reporters')
const tests = readdirSync(join(__dirname, '../tests')).filter((name) => name.endsWith('.test.cjs'))
if (!tests.length) {
    process.stderr.write('No shared tests found; refusing an empty green suite\n')
    process.exitCode = 1
} else {
    let executed = 0
    const stream = run({ files: tests.map((name) => join(__dirname, '../tests', name)) })
    stream.on('test:pass', (data) => {
        // Node counts a file without declared tests as a passing file wrapper.
        if (data.details.type === 'test' && data.name !== data.file && !data.skip && !data.todo) executed += 1
    })
    stream.on('test:fail', () => {
        process.exitCode = 1
    })
    stream.on('error', (error) => {
        process.stderr.write(`${error.message}\n`)
        process.exitCode = 1
    })
    stream.on('end', () => {
        if (!executed) {
            process.stderr.write('No shared tests executed; refusing an empty or entirely skipped green suite\n')
            process.exitCode = 1
        }
    })
    stream.compose(tap).pipe(process.stdout)
}
