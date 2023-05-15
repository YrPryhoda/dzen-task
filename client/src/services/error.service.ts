class ErrorService {
  checkResponse(response: Response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return null;
  }
}

export const errorService = new ErrorService();
