import * as core from '@actions/core'
import { promises as fs } from 'fs'
import * as yaml from 'js-yaml'

async function setOutput(key: string, value: any) {
  // Temporary hack until core actions library catches up with github new recommendations
  const output = process.env['GITHUB_OUTPUT']!
  await fs.appendFile(output, `${key}=${value}`)
}

const run = async () => {
    try {
        if (!process.env['GITHUB_OUTPUT']) {
            core.setFailed('GITHUB_OUTPUT env variable not defined')
            return
        }

        const file = core.getInput('file')
        const keys: string[] = JSON.parse(core.getInput('key-path'))

        const content = await fs.readFile(file, 'utf8')

        let yamlData = yaml.load(content)

        if (yamlData == null || yamlData == undefined) {
            core.setFailed('Error in reading the yaml file')
            return
        }

        let output = keys.reduce((dict: any, key) => dict[key], yamlData)
        await setOutput('data', output)
    } catch (error) {
        core.setFailed((error as Error).message)
    }
}

run()
