import {expect, test, jest} from '@jest/globals'
import {Release} from '../src/release'

jest.mock('../src/installer')

import {getLatestVersion} from '../src/version'
import {getWaypointIndex} from '../src/installer'

test('the latest version is returned', async () => {
  ;(getWaypointIndex as jest.Mock).mockImplementation(async () => {
    return <Release>{
      name: 'waypoint',
      versions: {
        '0.1.0': {
          builds: [
            {
              arch: 'amd64',
              filename: 'waypoint_0.1.0_darwin_amd64.zip',
              name: 'waypoint',
              os: 'darwin',
              url: 'https://releases.hashicorp.com/waypoint/0.1.0/waypoint_0.1.0_darwin_amd64.zip',
              version: '0.1.0'
            }
          ],
          name: 'waypoint',
          shasums: 'waypoint_0.1.0_SHA256SUMS',
          shasums_signature: 'waypoint_0.1.0_SHA256SUMS.sig',
          shasums_signatures: [
            'waypoint_0.1.0_SHA256SUMS.348FFC4C.sig',
            'waypoint_0.1.0_SHA256SUMS.72D7468F.sig',
            'waypoint_0.1.0_SHA256SUMS.sig'
          ],
          version: '0.1.0'
        },
        '0.1.1': {
          builds: [
            {
              arch: 'amd64',
              filename: 'waypoint_0.1.1_darwin_amd64.zip',
              name: 'waypoint',
              os: 'darwin',
              url: 'https://releases.hashicorp.com/waypoint/0.1.1/waypoint_0.1.1_darwin_amd64.zip',
              version: '0.1.1'
            }
          ],
          name: 'waypoint',
          shasums: 'waypoint_0.1.1_SHA256SUMS',
          shasums_signature: 'waypoint_0.1.1_SHA256SUMS.sig',
          shasums_signatures: [
            'waypoint_0.1.1_SHA256SUMS.348FFC4C.sig',
            'waypoint_0.1.1_SHA256SUMS.72D7468F.sig',
            'waypoint_0.1.1_SHA256SUMS.sig'
          ],
          version: '0.1.1'
        }
      }
    }
  })
  const release = await getLatestVersion()
  expect(release).toBe('0.1.1')
})
