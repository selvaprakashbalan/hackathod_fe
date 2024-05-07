export interface ILogin {
    message: string,
    status: boolean,
    data: IRoleId
}

export interface IRoleId {
    roleId: number
}

export interface IMaster {
    id: number,
    name: string
}
export interface IGetMasterList {
    message: string,
    status: boolean,
    data: Array<IGetMaster>
}

export interface IGetMaster {
    empList: Array<IMaster>,
    pmoList: Array<IMaster>,
    tLList: Array<IMaster>
}
