import { Observable, Subject } from 'rxjs';
export interface CacheContent {
    expiry?: number;
    data: any;
}
export declare const viewRefKey = "view-ref";
export declare const viewRefContainer = "view-ref-container";
export declare const dataNode = "dataNode";
export declare class ActionsService {
    private cache;
    private inFlightObseravbles;
    readonly DEFAULT_MAX_AGE: number;
    private addAction;
    onAdd: Observable<any>;
    onActChange(changes: any): void;
    /**
     * This method is an observables based in-memory cache implementation
     * Keeps track of in flight observablesand sets a default expory for cached values
     */
    /**
     * Gets the value from the cache if the key is provided.
     * If no value exists in cache, then chcek if the call exists
     * in flight, if so return the subejct, If not create a new
     * Subject inFlightObservble and return the source obseravble.
     */
    get(key: string, fallback?: Observable<any>, maxAge?: number): Observable<any> | Subject<any>;
    set(key: string, value: any, maxAge?: number): void;
    /**
     * Checks if the key exists in cache
     */
    has(key: string): boolean;
    /**
     * Publishes the value to all observers of the given
     * in progress observables if observers exist.
     */
    private notifyInFlightObservers(key, value);
    /**
     * Checks if key exists and has not expired
     */
    private hasValidCachedValue(key);
}
