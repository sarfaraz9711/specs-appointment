export const actionTypes = {
    GET_POSTS: 'GET_POSTS',
    GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
    GET_POSTS_ERROR: 'GET_POSTS_ERROR',

    GET_FEATURED_POST: 'GET_FEATURED_POST',
    GET_FEATURED_POST_SUCCESS: 'GET_FEATURED_POST_SUCCESS',
    GET_FEATURED_POST_ERROR: 'GET_FEATURED_POST_ERROR',

    GET_RECENT_POSTS: 'GET_RECENT_POSTS',
    GET_RECENT_POSTS_SUCCESS: 'GET_RECENT_POSTS_SUCCESS',
    GET_RECENT_POSTS_ERROR: 'GET_RECENT_POSTS_ERROR',

    GET_POST_CATEGORIES: 'GET_POST_CATEGORIES',
    GET_POST_CATEGORIES_SUCCESS: 'GET_POST_CATEGORIES_SUCCESS',
    GET_POST_CATEGORIES_ERROR: 'GET_POST_CATEGORIES_ERROR',
    GET_RELATED_BLOG:'GET_RELATED_BLOG',
    GET_POST_DETAIL:'GET_POST_DETAIL'
};

export function getPosts(payload) {
    return { type: actionTypes.GET_POSTS,payload:payload };
}

export function getPostsDetail(payload) {
    return { type: actionTypes.GET_POST_DETAIL,payload:payload };
}

export function getRelatedBlog(payload){
    return { type: actionTypes.GET_RELATED_BLOG,payload:payload };
}

export function getPostsSuccess(data) {
    return {
        type: actionTypes.GET_POSTS_SUCCESS,
        data
    };
}

export function getPostsError(error) {
    return {
        type: actionTypes.GET_POSTS_ERROR,
        error
    };
}
export function getFeaturedPost() {
    return { type: actionTypes.GET_FEATURED_POST };
}

export function getFeaturedPostSuccess(data) {
    return {
        type: actionTypes.GET_FEATURED_POST_SUCCESS,
        data
    };
}

export function getFeaturedPostError(error) {
    return {
        type: actionTypes.GET_FEATURED_POST_ERROR,
        error
    };
}
export function getRecentPosts() {
    return { type: actionTypes.GET_RECENT_POSTS };
}

export function getRecentPostsSuccess(data) {
    return {
        type: actionTypes.GET_RECENT_POSTS_SUCCESS,
        data
    };
}

export function getRecentPostsError(error) {
    return {
        type: actionTypes.GET_RECENT_POSTS_ERROR,
        error
    };
}
export function getPostCategories() {
    return { type: actionTypes.GET_POST_CATEGORIES };
}

export function getPostCategoriesSuccess(data) {
    return {
        type: actionTypes.GET_POST_CATEGORIES_SUCCESS,
        data
    };
}

export function getPostCategoriesError(error) {
    return {
        type: actionTypes.GET_POST_CATEGORIES_ERROR,
        error
    };
}
