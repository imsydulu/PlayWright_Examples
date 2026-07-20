import { test } from '@playwright/test'

test('test 1', async () => {
    console.log("test1 is executed!!!!!!!!!");
})
test('test 2', async () => {
    console.log("test2 is executed!!!!!!!!!");
})
test('test 3', async () => {
    console.log("test3 is executed!!!!!!!!!");
})
test('test 4', async () => {
    console.log("test4 is executed!!!!!!!!!");
})

//group 1 

test.describe('group1', async () => {
    test('test 1', async () => {
        console.log("test1 is executed!!!!!!!!!");
    })
    test('test 2', async () => {
        console.log("test2 is executed!!!!!!!!!");
    })
    console.log("Group 1 is executed!!!!!!");
})
//group 2
test.describe('group2', async () => {
    test('test 3', async () => {
        console.log("test3 is executed!!!!!!!!!");
    })
    test('test 4', async () => {
        console.log("test4 is executed!!!!!!!!!");
    })
    console.log("Group 2 is executed!!!!!!");
})