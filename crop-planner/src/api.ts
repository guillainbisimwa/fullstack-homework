import { Crop, Field, Humus } from './types'

const SOIL_SERVICE_URL = 'http://localhost:3000'

export const fetchFields = async (): Promise<Array<Field>> =>
  await fetch(`${SOIL_SERVICE_URL}/fields`).then(response => response.json())

export const fetchCrops = async (): Promise<Array<Crop>> =>
  await fetch(`${SOIL_SERVICE_URL}/crops`).then(response => response.json())

export const postHumus = async (delta: Array<Humus>): Promise<Array<Humus>> =>
  await fetch(`${SOIL_SERVICE_URL}/humus_balance`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(delta)
  }).then(response => response.json()).catch(err => err.message)

