import * as core from '@actions/core'
import * as httpm from '@actions/http-client'
import * as tc from '@actions/tool-cache'
import {Release} from './release'
import os from 'os'
import path from 'path'

export async function getWaypointIndex(): Promise<Release> {
  const http: httpm.HttpClient = new httpm.HttpClient(
    'setup-waypoint (GitHub Action)',
    [],
    {
      headers: {
        Accept:
          'application/vnd+hashicorp.releases-api.v0+json;application/vnd+hashicorp.releases-api.v1+json',
        'Content-Type': 'application/json'
      }
    }
  )
  const indexUrl = 'https://releases.hashicorp.com/waypoint/index.json'
  const res: httpm.HttpClientResponse = await http.get(indexUrl)
  const body: string = await res.readBody()
  const result: Release = JSON.parse(body)
  return result
}

export async function installWaypointVersion(
  version: string,
  plat: string,
  architecture: string
): Promise<string> {
  core.info(`Acquiring ${version}`)

  // Windows requires that we keep the extension (.zip) for extraction
  const isWindows = os.platform() === 'win32'
  const tempDir = process.env.RUNNER_TEMP || '.'
  const fileName = isWindows
    ? path.join(tempDir, `waypoint_${version}_${plat}_${architecture}.zip`)
    : undefined

  const downloadUrl = `https://releases.hashicorp.com/waypoint/${version}/waypoint_${version}_${plat}_${architecture}.zip`
  core.info(`Downloading ${downloadUrl}`)
  const downloadPath = await tc.downloadTool(
    `https://releases.hashicorp.com/waypoint/${version}/waypoint_${version}_${plat}_${architecture}.zip`,
    fileName
  )

  core.info('Extracting Waypoint...')
  const waypointExtractedFolder = await tc.extractZip(downloadPath)
  core.info(`Successfully extracted Waypoint to ${waypointExtractedFolder}`)
  core.info('Adding to the cache...')
  const cachedDir = await tc.cacheDir(
    waypointExtractedFolder,
    'waypoint',
    version,
    architecture
  )
  core.info(`Successfully cached Waypoint to ${cachedDir}`)
  return cachedDir
}

export async function getWaypoint(
  version: string,
  plat: string,
  architecture: string
): Promise<string> {
  // check cache
  const toolPath = tc.find('waypoint', version, architecture)
  // If not found in cache, download
  if (toolPath) {
    core.info(`Found in cache @ ${toolPath}`)
    return toolPath
  }
  core.info(`Attempting to download ${version}...`)
  const waypointPath = await installWaypointVersion(version, plat, architecture)
  return waypointPath
}
