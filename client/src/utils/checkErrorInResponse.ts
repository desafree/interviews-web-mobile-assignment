function CheckErrorInResponse(response: Response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json()
  } else {
    throw Error(response.statusText)
  }
}

export default CheckErrorInResponse
