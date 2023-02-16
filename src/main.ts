import * as core from '@actions/core'
import * as io from '@actions/io'
import cp from 'child_process'
import path from 'path'
import {getWaypoint} from './installer'
import {resolveVersionInput} from './version'
import {getPlatform, getArchitecture} from './system'

async function run(): Promise<void> {
  try {
    const version = await resolveVersionInput()
    const plat = getPlatform()
    const architecture = getArchitecture()
    const installDir = await getWaypoint(version, plat, architecture)
    core.addPath(path.join(installDir))
    core.info('Added Waypoint to the PATH')

    const waypointPath = await io.which('waypoint')
    const waypointVersion = (
      cp.execSync(`${waypointPath} version`) || ''
    ).toString()

    core.info(waypointVersion)
    core.setOutput('waypoint-version', version)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
