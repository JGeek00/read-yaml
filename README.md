<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/YAML_Logo.svg" width=150></img>
# Read YAML

This action reads yaml data from a file and outputs the result.

## IO

Input and output variables used by read-yaml

### Inputs
- **`file` Required** yaml file to read from.

- **`key-path` Required** Path of keys to the value as a JSON list.

### Outputs
- **`data`** Data read from YAML file.

## Example usage

``` yaml
on: [ push, pull_request ]

jobs:
  test-yaml-reader:
    runs-on: ubuntu-latest
    name: Test read-yaml
    steps:
      - uses: actions/checkout@v1

      - name: Run read-yaml-files action
        id: yaml-data
        uses: jgeek00/read-yaml-files@master      # You may wish to replace main with a version tag such as '1.6' etc.
        with:
          file: './action.yml'          # File to read from
          key-path: '["runs", "using"]' # Access the runs key then the using key and retuns the value.

      - name: Display read-yaml output
        run: echo "${{ steps.yaml-data.outputs.data }}"
```

##### Originally developed by [jbutcher5](https://github.com/jbutcher5/read-yaml)