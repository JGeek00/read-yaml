import { setFailed, setOutput, getInput } from '@actions/core'
import { promises as fs } from 'fs'
import { load } from 'js-yaml'

const run = async () => {
    try {
        const file = getInput('file')
        const keys: string[] = JSON.parse(getInput('key-path'))

        const content = await fs.readFile(file, 'utf8')

        let yamlData = load(content)

        if (yamlData == null || yamlData == undefined) {
            setFailed('Error in reading the yaml file')
            return
        }

        let output = keys.reduce((dict: any, key) => dict[key], yamlData)
        setOutput('data', output)
    } catch (error) {
        setFailed((error as Error).message)
    }
}

run()
