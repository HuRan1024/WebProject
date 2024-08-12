import { VitestRunner } from './types.js';
export { CancelReason, VitestRunnerConfig, VitestRunnerConstructor, VitestRunnerImportSource } from './types.js';
import { T as Task, F as File, d as SuiteAPI, e as TestAPI, f as SuiteCollector, g as CustomAPI, B as BeforeAllListener, A as AfterAllListener, h as BeforeEachListener, i as AfterEachListener, j as TaskHook, O as OnTestFailedHandler, k as OnTestFinishedHandler, a as Test, C as Custom, S as Suite, l as SuiteHooks } from './tasks-zB5uPauP.js';
export { D as DoneCallback, L as ExtendedContext, w as Fixture, v as FixtureFn, u as FixtureOptions, x as Fixtures, y as HookCleanupCallback, H as HookListener, I as InferFixturesTypes, R as RunMode, G as RuntimeContext, M as SequenceHooks, N as SequenceSetupFiles, E as SuiteFactory, n as TaskBase, K as TaskContext, z as TaskCustomOptions, p as TaskMeta, o as TaskPopulated, q as TaskResult, r as TaskResultPack, m as TaskState, J as TestContext, s as TestFunction, t as TestOptions, U as Use } from './tasks-zB5uPauP.js';
import { Awaitable } from '@vitest/utils';
export { processError } from '@vitest/utils/error';
import '@vitest/utils/diff';

declare function updateTask(task: Task, runner: VitestRunner): void;
declare function startTests(paths: string[], runner: VitestRunner): Promise<File[]>;
declare function publicCollect(paths: string[], runner: VitestRunner): Promise<File[]>;

/**
 * Creates a suite of tests, allowing for grouping and hierarchical organization of tests.
 * Suites can contain both tests and other suites, enabling complex test structures.
 *
 * @param {string} name - The name of the suite, used for identification and reporting.
 * @param {Function} fn - A function that defines the tests and suites within this suite.
 *
 * @example
 * // Define a suite with two tests
 * suite('Math operations', () => {
 *   test('should add two numbers', () => {
 *     expect(add(1, 2)).toBe(3);
 *   });
 *
 *   test('should subtract two numbers', () => {
 *     expect(subtract(5, 2)).toBe(3);
 *   });
 * });
 *
 * @example
 * // Define nested suites
 * suite('String operations', () => {
 *   suite('Trimming', () => {
 *     test('should trim whitespace from start and end', () => {
 *       expect('  hello  '.trim()).toBe('hello');
 *     });
 *   });
 *
 *   suite('Concatenation', () => {
 *     test('should concatenate two strings', () => {
 *       expect('hello' + ' ' + 'world').toBe('hello world');
 *     });
 *   });
 * });
 */
declare const suite: SuiteAPI;
/**
 * Defines a test case with a given name and test function. The test function can optionally be configured with test options.
 *
 * @param {string | Function} name - The name of the test or a function that will be used as a test name.
 * @param {TestOptions | TestFunction} [optionsOrFn] - Optional. The test options or the test function if no explicit name is provided.
 * @param {number | TestOptions | TestFunction} [optionsOrTest] - Optional. The test function or options, depending on the previous parameters.
 * @throws {Error} If called inside another test function.
 *
 * @example
 * // Define a simple test
 * test('should add two numbers', () => {
 *   expect(add(1, 2)).toBe(3);
 * });
 *
 * @example
 * // Define a test with options
 * test('should subtract two numbers', { retry: 3 }, () => {
 *   expect(subtract(5, 2)).toBe(3);
 * });
 */
declare const test: TestAPI;
/**
 * Creates a suite of tests, allowing for grouping and hierarchical organization of tests.
 * Suites can contain both tests and other suites, enabling complex test structures.
 *
 * @param {string} name - The name of the suite, used for identification and reporting.
 * @param {Function} fn - A function that defines the tests and suites within this suite.
 *
 * @example
 * // Define a suite with two tests
 * describe('Math operations', () => {
 *   test('should add two numbers', () => {
 *     expect(add(1, 2)).toBe(3);
 *   });
 *
 *   test('should subtract two numbers', () => {
 *     expect(subtract(5, 2)).toBe(3);
 *   });
 * });
 *
 * @example
 * // Define nested suites
 * describe('String operations', () => {
 *   describe('Trimming', () => {
 *     test('should trim whitespace from start and end', () => {
 *       expect('  hello  '.trim()).toBe('hello');
 *     });
 *   });
 *
 *   describe('Concatenation', () => {
 *     test('should concatenate two strings', () => {
 *       expect('hello' + ' ' + 'world').toBe('hello world');
 *     });
 *   });
 * });
 */
declare const describe: SuiteAPI;
/**
 * Defines a test case with a given name and test function. The test function can optionally be configured with test options.
 *
 * @param {string | Function} name - The name of the test or a function that will be used as a test name.
 * @param {TestOptions | TestFunction} [optionsOrFn] - Optional. The test options or the test function if no explicit name is provided.
 * @param {number | TestOptions | TestFunction} [optionsOrTest] - Optional. The test function or options, depending on the previous parameters.
 * @throws {Error} If called inside another test function.
 *
 * @example
 * // Define a simple test
 * it('adds two numbers', () => {
 *   expect(add(1, 2)).toBe(3);
 * });
 *
 * @example
 * // Define a test with options
 * it('subtracts two numbers', { retry: 3 }, () => {
 *   expect(subtract(5, 2)).toBe(3);
 * });
 */
declare const it: TestAPI;
declare function getCurrentSuite<ExtraContext = object>(): SuiteCollector<ExtraContext>;
declare function createTaskCollector(fn: (...args: any[]) => any, context?: Record<string, unknown>): CustomAPI;

/**
 * Registers a callback function to be executed once before all tests within the current suite.
 * This hook is useful for scenarios where you need to perform setup operations that are common to all tests in a suite, such as initializing a database connection or setting up a test environment.
 *
 * **Note:** The `beforeAll` hooks are executed in the order they are defined one after another. You can configure this by changing the `sequence.hooks` option in the config file.
 *
 * @param {Function} fn - The callback function to be executed before all tests.
 * @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
 * @returns {void}
 *
 * @example
 * // Example of using beforeAll to set up a database connection
 * beforeAll(async () => {
 *   await database.connect();
 * });
 */
declare function beforeAll(fn: BeforeAllListener, timeout?: number): void;
/**
 * Registers a callback function to be executed once after all tests within the current suite have completed.
 * This hook is useful for scenarios where you need to perform cleanup operations after all tests in a suite have run, such as closing database connections or cleaning up temporary files.
 *
 * **Note:** The `afterAll` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
 *
 * @param {Function} fn - The callback function to be executed after all tests.
 * @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
 * @returns {void}
 *
 * @example
 * // Example of using afterAll to close a database connection
 * afterAll(async () => {
 *   await database.disconnect();
 * });
 */
declare function afterAll(fn: AfterAllListener, timeout?: number): void;
/**
 * Registers a callback function to be executed before each test within the current suite.
 * This hook is useful for scenarios where you need to reset or reinitialize the test environment before each test runs, such as resetting database states, clearing caches, or reinitializing variables.
 *
 * **Note:** The `beforeEach` hooks are executed in the order they are defined one after another. You can configure this by changing the `sequence.hooks` option in the config file.
 *
 * @param {Function} fn - The callback function to be executed before each test. This function receives an `TestContext` parameter if additional test context is needed.
 * @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
 * @returns {void}
 *
 * @example
 * // Example of using beforeEach to reset a database state
 * beforeEach(async () => {
 *   await database.reset();
 * });
 */
declare function beforeEach<ExtraContext = object>(fn: BeforeEachListener<ExtraContext>, timeout?: number): void;
/**
 * Registers a callback function to be executed after each test within the current suite has completed.
 * This hook is useful for scenarios where you need to clean up or reset the test environment after each test runs, such as deleting temporary files, clearing test-specific database entries, or resetting mocked functions.
 *
 * **Note:** The `afterEach` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
 *
 * @param {Function} fn - The callback function to be executed after each test. This function receives an `TestContext` parameter if additional test context is needed.
 * @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
 * @returns {void}
 *
 * @example
 * // Example of using afterEach to delete temporary files created during a test
 * afterEach(async () => {
 *   await fileSystem.deleteTempFiles();
 * });
 */
declare function afterEach<ExtraContext = object>(fn: AfterEachListener<ExtraContext>, timeout?: number): void;
/**
 * Registers a callback function to be executed when a test fails within the current suite.
 * This function allows for custom actions to be performed in response to test failures, such as logging, cleanup, or additional diagnostics.
 *
 * **Note:** The `onTestFailed` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
 *
 * @param {Function} fn - The callback function to be executed upon a test failure. The function receives the test result (including errors).
 * @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
 * @throws {Error} Throws an error if the function is not called within a test.
 * @returns {void}
 *
 * @example
 * // Example of using onTestFailed to log failure details
 * onTestFailed(({ errors }) => {
 *   console.log(`Test failed: ${test.name}`, errors);
 * });
 */
declare const onTestFailed: TaskHook<OnTestFailedHandler>;
/**
 * Registers a callback function to be executed when the current test finishes, regardless of the outcome (pass or fail).
 * This function is ideal for performing actions that should occur after every test execution, such as cleanup, logging, or resetting shared resources.
 *
 * This hook is useful if you have access to a resource in the test itself and you want to clean it up after the test finishes. It is a more compact way to clean up resources than using the combination of `beforeEach` and `afterEach`.
 *
 * **Note:** The `onTestFinished` hooks are running in reverse order of their registration. You can configure this by changing the `sequence.hooks` option in the config file.
 *
 * @param {Function} fn - The callback function to be executed after a test finishes. The function can receive parameters providing details about the completed test, including its success or failure status.
 * @param {number} [timeout] - Optional timeout in milliseconds for the hook. If not provided, the default hook timeout from the runner's configuration is used.
 * @throws {Error} Throws an error if the function is not called within a test.
 * @returns {void}
 *
 * @example
 * // Example of using onTestFinished for cleanup
 * const db = await connectToDatabase();
 * onTestFinished(async () => {
 *   await db.disconnect();
 * });
 */
declare const onTestFinished: TaskHook<OnTestFinishedHandler>;

declare function setFn(key: Test | Custom, fn: () => Awaitable<void>): void;
declare function getFn<Task = Test | Custom>(key: Task): () => Awaitable<void>;
declare function setHooks(key: Suite, hooks: SuiteHooks): void;
declare function getHooks(key: Suite): SuiteHooks;

declare function getCurrentTest<T extends Test | Custom | undefined>(): T;

export { AfterAllListener, AfterEachListener, BeforeAllListener, BeforeEachListener, Custom, CustomAPI, File, OnTestFailedHandler, OnTestFinishedHandler, Suite, SuiteAPI, SuiteCollector, SuiteHooks, Task, TaskHook, Test, TestAPI, VitestRunner, afterAll, afterEach, beforeAll, beforeEach, publicCollect as collectTests, createTaskCollector, describe, getCurrentSuite, getCurrentTest, getFn, getHooks, it, onTestFailed, onTestFinished, setFn, setHooks, startTests, suite, test, updateTask };
