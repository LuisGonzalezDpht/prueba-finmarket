import { validateIsJson } from '@/composable/useValidators'
import Axios from 'axios'

export async function getAPI<T>(
  url: string,
): Promise<{ data: T | null; status: boolean; message?: string }> {
  try {
    const response = await Axios.get(url)

    if ((await response).status === 200) {
      const data = (await response).data

      if (validateIsJson(data)) {
        return { data: data, status: true }
      } else {
        return { data: null, status: false, message: 'Error no JSON object' }
      }
    } else {
      return { data: null, status: false, message: 'Error Data not Found' }
    }
  } catch (err) {
    console.error(err)
    return { data: null, status: false, message: 'Internal Error' }
  }
}
