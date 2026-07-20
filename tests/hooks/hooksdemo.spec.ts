import { test } from '@playwright/test'

test.beforeEach('BeforeEch test:', async () => {
    console.log("BeforeEach Test!!");

})

test.afterEach('AfterEach Test: ', async () => {
    console.log("AfterEach Test!!!");

})

test.beforeAll('BeforeAll Test: ', async () => {
    console.log("BeforeALl Test!!!");

})

test.afterAll('AfterAll test:', async () => {
    console.log("after all test executed!!!!!!!!!");

})

test("First test ", async () => {
    console.log("First Test!!!!!");

})

test('second test:', async () => {
    console.log("Second Test!!!!");

})

test('Third Test: ', async () => {
    console.log("Third Test!!!");

})
