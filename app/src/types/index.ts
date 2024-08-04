export type getIndividualEventDetailsProp = {
    id: string;
    name: string;
    date: Date;
    location: string;
    coordinatorEmail: string;
    createdAt: Date;
    count: number;
    registrations: { id: string; createdAt: Date }[];
};


export type InitialStateType = {
    message: string;
    success: boolean | null;
    loading: boolean;
}