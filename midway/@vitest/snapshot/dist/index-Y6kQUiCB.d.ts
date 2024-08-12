import { Plugin, OptionsReceived } from '@vitest/pretty-format';
import { S as SnapshotEnvironment } from './environment-Ddx0EDtY.js';

interface RawSnapshotInfo {
    file: string;
    readonly?: boolean;
    content?: string;
}

type SnapshotData = Record<string, string>;
type SnapshotUpdateState = 'all' | 'new' | 'none';
type SnapshotSerializer = Plugin;
interface SnapshotStateOptions {
    updateSnapshot: SnapshotUpdateState;
    snapshotEnvironment: SnapshotEnvironment;
    expand?: boolean;
    snapshotFormat?: OptionsReceived;
    resolveSnapshotPath?: (path: string, extension: string) => string;
}
interface SnapshotMatchOptions {
    testName: string;
    received: unknown;
    key?: string;
    inlineSnapshot?: string;
    isInline: boolean;
    error?: Error;
    rawSnapshot?: RawSnapshotInfo;
}
interface SnapshotResult {
    filepath: string;
    added: number;
    fileDeleted: boolean;
    matched: number;
    unchecked: number;
    uncheckedKeys: Array<string>;
    unmatched: number;
    updated: number;
}
interface UncheckedSnapshot {
    filePath: string;
    keys: Array<string>;
}
interface SnapshotSummary {
    added: number;
    didUpdate: boolean;
    failure: boolean;
    filesAdded: number;
    filesRemoved: number;
    filesRemovedList: Array<string>;
    filesUnmatched: number;
    filesUpdated: number;
    matched: number;
    total: number;
    unchecked: number;
    uncheckedKeysByFile: Array<UncheckedSnapshot>;
    unmatched: number;
    updated: number;
}

export type { RawSnapshotInfo as R, SnapshotStateOptions as S, UncheckedSnapshot as U, SnapshotMatchOptions as a, SnapshotResult as b, SnapshotData as c, SnapshotUpdateState as d, SnapshotSerializer as e, SnapshotSummary as f };
