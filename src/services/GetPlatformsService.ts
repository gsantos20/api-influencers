import { Platform } from '@models/Platform'
import { Platforms } from '@repositories/mock/plataforms'

export class GetPlatformsService {
  async execute(params: Partial<Platform>): Promise<Platform[] | []> {
    const platforms = Platforms.filter((item) => {
      for (const key in params) {
        if (item[key] != params[key]) {
          return false
        }
      }
      return true
    })

    return platforms
  }
}
