export interface Release {
  name: Name
  versions: {[key: string]: Version}
}

export enum Name {
  Waypoint = 'waypoint'
}

export interface Version {
  builds: Build[]
  name: Name
  shasums: string
  shasums_signature: string
  shasums_signatures: string[]
  version: string
}

export interface Build {
  arch: string
  filename: string
  name: Name
  os: OS
  url: string
  version: string
}

export enum OS {
  Darwin = 'darwin',
  Linux = 'linux',
  Windows = 'windows'
}
