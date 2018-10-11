import { Observable } from 'rxjs';
export declare class SortDirectiveService {
    private direction;
    finalDir: Observable<string>;
    catchFinalDir(dir: string): void;
}
