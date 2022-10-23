import postsReducer from '../utils/postsReducer'
import * as myPosts from '../utils/mock/mockupPosts'

describe('test reducer functionality', () => {
  test('test GET functionality', () => {
    const newPosts = postsReducer([], {
      type: 'GET',
      payload: myPosts.postsMockup,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test GET functionality with invalid payload (single post)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'GET',
      payload: myPosts.newPost,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test GET functionality with invalid payload (string)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, { type: 'GET', payload: 'invalid payload' })
    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test GET functionality with invalid payload (null)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, { type: 'GET', payload: null })
    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test ADD functionality', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'ADD',
      payload: myPosts.newPost,
    })
    console.log(newPosts, [...myPosts.postsMockup, myPosts.newPost])
    Object()
    expect(newPosts).toEqual([...myPosts.postsMockup, myPosts.newPost])
  })

  test('test ADD functionality with invalid payload (array of posts)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'ADD',
      payload: myPosts.postsMockup,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test ADD functionality with invalid payload (string)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'ADD',
      payload: 'invalid input',
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test ADD functionality with invalid payload (null)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'ADD',
      payload: null,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test ADD functionality with already preset post', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'ADD',
      payload: myPosts.postToRemove,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test REMOVE functionality', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'REMOVE',
      payload: myPosts.postToRemove,
    })

    expect(newPosts).toEqual([myPosts.postsMockup[0]])
  })

  test('test REMOVE functionality with post not in array', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'REMOVE',
      payload: myPosts.newPost,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test REMOVE functionality with invalid payload (string)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'REMOVE',
      payload: 'invalid payload',
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test REMOVE functionality with invalid payload (null)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'REMOVE',
      payload: null,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test UPDATE functionality', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'UPDATE',
      payload: myPosts.updatedPost,
    })

    expect(newPosts).toEqual(myPosts.updatedPosts)
  })

  test('test UPDATE functionality with post not in array', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'UPDATE',
      payload: myPosts.newPost,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test UPDATE functionality with invalid input (string)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'UPDATE',
      payload: 'invalid input',
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })

  test('test UPDATE functionality with invalid input (null)', () => {
    const newPosts = postsReducer(myPosts.postsMockup, {
      type: 'UPDATE',
      payload: null,
    })

    expect(newPosts).toEqual(myPosts.postsMockup)
  })
})
