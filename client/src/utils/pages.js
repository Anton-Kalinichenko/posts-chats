export const getPageCount = (totalPostCount, postsLimit) => {
    return Math.ceil(totalPostCount / postsLimit);
}
