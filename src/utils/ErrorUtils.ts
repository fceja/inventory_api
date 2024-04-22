export const handleUnknownError = (error: unknown): void => {
    if (!(error instanceof Error)) {
        throw error;
    }
    console.error(error.message)
}