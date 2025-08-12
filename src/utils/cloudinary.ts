interface CloudinaryUploadResponse {
  secure_url: string
  public_id: string
  format: string
  resource_type: string
  bytes: number
  width?: number
  height?: number
}

interface UploadOptions {
  folder?: string
  transformation?: string
  tags?: string[]
}

class CloudinaryService {
  private cloudName = "ddn7ztrwq"
  private uploadPreset = "Product_upload"
  private baseUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}`

  async uploadImage(file: File, options: UploadOptions = {}): Promise<CloudinaryUploadResponse> {
    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", this.uploadPreset)
    formData.append("folder", options.folder || "products")

    if (options.tags) {
      formData.append("tags", options.tags.join(","))
    }

    if (options.transformation) {
      formData.append("transformation", options.transformation)
    }

    try {
      const response = await fetch(`${this.baseUrl}/image/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result: CloudinaryUploadResponse = await response.json()
      return result
    } catch (error) {
      console.error("Cloudinary upload error:", error)
      throw new Error("Failed to upload image to Cloudinary")
    }
  }

  async uploadMultipleImages(files: File[], options: UploadOptions = {}): Promise<CloudinaryUploadResponse[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, options))
    return Promise.all(uploadPromises)
  }

  generateImageUrl(publicId: string, transformations?: string): string {
    const baseImageUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`

    if (transformations) {
      return `${baseImageUrl}/${transformations}/${publicId}`
    }

    return `${baseImageUrl}/${publicId}`
  }

  generateThumbnailUrl(publicId: string): string {
    return this.generateImageUrl(publicId, "w_300,h_300,c_fill,q_auto,f_auto")
  }

  async deleteImage(publicId: string): Promise<boolean> {
    try {
      // Note: Deletion requires authentication, typically done on backend
      // This is a placeholder for frontend reference
      console.warn("Image deletion should be handled on the backend for security")
      return false
    } catch (error) {
      console.error("Failed to delete image:", error)
      return false
    }
  }
}

export const cloudinaryService = new CloudinaryService()

// Helper function for easier importing
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const result = await cloudinaryService.uploadImage(file)
  return result.secure_url
}

export type { CloudinaryUploadResponse, UploadOptions }
