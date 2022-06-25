import {gql} from '@apollo/client';

export const createIdea = gql`
mutation createIdea(
    $title: String,
    $body: String,
    $tags: String,
    $userId: ID 
  ) {
    createIdea(data: {
      title: $title,
      body:$body,
      tags:$tags,
      upvotes: 0,
      downvotes:0,
      users_permissions_user: $userId
    }) {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
}`
export const createComment = gql`
  mutation createComment(
    $comment: String,
      $userId: ID,
    $ideaId: ID
  ) {
    createComment(data: {
      comment: $comment,
      users_permissions_user: $userId,
      idea: $ideaId,
    }) {
      data {
        id
        attributes {
            users_permissions_user {
                data {
                    attributes {
                        username
                    }
                }
            }
        }
      }
    }
  }`

export const createReply = gql`
  mutation createReply(
    $commentId: ID,
    $reply: String,
    $userId: ID
  ) {
    createReply(data: {
      comment: $commentId,
      reply: $reply,
      users_permissions_user: $userId
    }) {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }`

export const getIdeas = gql`
  query getIdeas(
    $page: Int,
    $pageSize: Int
  ) {
    ideas(sort: "createdAt:desc", pagination:{page: $page, pageSize: $pageSize}) {
      data {
        id
        attributes {
          title
          tags
          createdAt
          body
          upvotes
          downvotes
          users_permissions_user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }`
  
export const getIdea = gql`
  query getIdea(
  $id: ID!
) {
  idea(id: $id) {
    data {
      id
      attributes {
        title
        tags
        body
        createdAt
        upvotes
        downvotes
        comments {
          data {
            id
            attributes {
              comment
              users_permissions_user {
                data {
                  id 
                  attributes {
                    username
                  }
                }
              }
              replies {
                data {
                  id
                  attributes {
                    reply
                    users_permissions_user {
                      data {
                        attributes {
                          username
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        users_permissions_user {
          data {
            id
            attributes {
              username
            }
          }
        }
      }
    }
  }
}`

export const handleVoteIdea = gql`
mutation votes($ideaId:ID!, $upvotes: Int, $downvotes: Int) {
  updateIdea(id: $ideaId, data:{
    upvotes: $upvotes,
    downvotes:$downvotes
  }) {
    data {
      id
      attributes {
        upvotes
        downvotes
      }
    }
  }
}`