const { test } = require('node:test')
const assert = require('node:assert/strict')
const { mkdtempSync, mkdirSync, copyFileSync, rmSync } = require('node:fs')
const { join } = require('node:path')
const { tmpdir } = require('node:os')
const { spawnSync } = require('node:child_process')
test('an empty shared test directory fails instead of reporting green', () => {
    const dir = mkdtempSync(join(tmpdir(), 'studup-empty-tests-'))
    try {
        mkdirSync(join(dir, 'scripts'))
        mkdirSync(join(dir, 'tests'))
        copyFileSync(join(__dirname, '../scripts/test.cjs'), join(dir, 'scripts/test.cjs'))
        const result = spawnSync(process.execPath, [join(dir, 'scripts/test.cjs')], { encoding: 'utf8' })
        assert.equal(result.status, 1)
        assert.match(result.stderr, /No shared tests found/)
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
})

for (const [name, source] of [
    ['comment-only', '// There are no declared tests here\n'],
    ['all-skipped', "require('node:test').skip('skipped test', () => {})\n"],
    ['failing', "require('node:test')('failure', () => { throw new Error('intentional fixture failure') })\n"],
]) {
    test(`a ${name} shared suite cannot report success`, () => {
        const dir = mkdtempSync(join(tmpdir(), 'studup-invalid-tests-'))
        try {
            mkdirSync(join(dir, 'scripts'))
            mkdirSync(join(dir, 'tests'))
            copyFileSync(join(__dirname, '../scripts/test.cjs'), join(dir, 'scripts/test.cjs'))
            require('node:fs').writeFileSync(join(dir, 'tests/fixture.test.cjs'), source)
            const result = spawnSync(process.execPath, [join(dir, 'scripts/test.cjs')], { encoding: 'utf8' })
            assert.equal(result.status, 1)
            if (name !== 'failing') assert.match(result.stderr, /No shared tests executed/)
        } finally {
            rmSync(dir, { recursive: true, force: true })
        }
    })
}
