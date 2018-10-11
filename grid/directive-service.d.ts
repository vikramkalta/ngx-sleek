import { Observable } from 'rxjs';
export declare class DirectiveService {
    private totalColumns;
    totalColumnsAsObservable: Observable<number>;
    setTotalColumns(columns: any[]): void;
}
