import {GeneralMessage} from "../modules/pos/core/framework/General/Typing/Message";

export interface EntityDatabaseInterface {

    toArray(): Promise<any[]>;

    query(where?: string): Promise<GeneralMessage>;

    bulkAdd(data: any[], udpate?: boolean): Promise<GeneralMessage>;

    get(where?: string): Promise<GeneralMessage>;

    delete(where: string): Promise<GeneralMessage>;

    save(data: any, update?: boolean): Promise<GeneralMessage>;

    clear(): Promise<GeneralMessage>;
}