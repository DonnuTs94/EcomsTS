export interface UploadOptions {
  filePrefix?: string
  fileName?: string
  acceptedFileTypes?: string[]
  maxSize?: number
  dynamicDestination: string
}
