import { AuthGuard } from './auth.guard';
import { DataLoadedGuard } from './data-loaded.guard';
import { ConfirmationGuard } from './confirmation.guard';

export const guards = [
    AuthGuard,
    DataLoadedGuard,
    ConfirmationGuard
];

export * from './auth.guard';
export * from './data-loaded.guard';
export * from './confirmation.guard';
