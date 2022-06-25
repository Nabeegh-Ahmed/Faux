import { errorHandler } from "./errorHandler"

// asyncHandler
// This is a middleware that will be used to handle async errors
// It will be used in the following way:
// async function myFunction() {
//     await asyncHandler(async() => {
//         await someAsyncFunction()
//     }
// }
// It will catch any errors that are thrown in the async function
// and will throw an error with the message that is returned by the errorHandler
// function
export const asyncHandler = async (asyncFunc: () => Promise<any>) => {
    try {
        return asyncFunc()
    } catch (error) {
        throw new Error(errorHandler(error).message)
    }
}