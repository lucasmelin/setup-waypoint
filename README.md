<h1 align="center"> setup-waypoint GitHub Action </h1>

<p align="center">
A GitHub Action to install a specific version of HashiCorp Waypoint and add it to the PATH
</p>

## Inputs

### `version`

**Required** A version of HashiCorp Waypoint to install. Defaults to `latest`.

## Outputs

### `waypoint-version`

The version of HashiCorp Waypoint that was installed.

## Example usage

```yaml
uses: lucasmelin/setup-waypoint@v1
with:
  version: "0.11.0"
```

## Development

Install the dependencies
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

## Publish

```bash
$ npm run package
$ git add dist
$ git commit -a -m "Production dependencies"
$ git push origin releases/v1
```