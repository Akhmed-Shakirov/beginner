import axios from 'axios'
import { ref } from 'vue'
// import type { ICrud } from '@/types/crud'

interface ICrud {
    data: Array<any>
    isLoading: boolean | any
    isError: boolean | any
    pagination?: {
        page_count: number
        total_count: number
        total_pages: number
        links?: {
            next: null | string
            previous: null | string
        }
    } | {}
}



export const useService = async (state: any, api: string, method: string = 'GET', item?: any): Promise<ICrud> => {
    const data = ref(state.data)
    const pagination = ref(state.pagination)
    const isLoading = ref<boolean>(true)
    const isError = ref<boolean>(false)

    const fetchData = async () => {
        try {
            let result: any = null

            if (method == 'POST') {
                if (item?.id) delete item?.id
                result = await axios.post(api, item)
                data.value = [ ...data.value, result.data ]
            }
            if (method == 'GET') {
                result = await axios.get(api)

                pagination.value = result?.data
                data.value = result?.data?.results
                delete pagination.value?.results
            }
            if (['PUT', 'PATCH'].includes(method)) {
                if (method == 'PATCH') {
                    result = await axios.patch(api + item?.id + '/', item)
                } else {
                    result = await axios.put(api + item?.id + '/', item)
                }

                const index = data.value.findIndex((el: any) => el?.id === +item?.id)
                data.value.splice(index, 1, result.data);
            }
            if (method == 'DELETE') {
                await axios.delete(api + item?.id + '/')
                data.value = data.value.filter((el: any) => el?.id !== +item?.id)
            }
        } catch (error) {
            // error
            isError.value = true
        } finally {
            isLoading.value = false
        }
    }

    await fetchData()

    return {
        data,
        pagination,
        isLoading,
        isError
    }
}
