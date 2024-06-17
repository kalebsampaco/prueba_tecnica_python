export interface PrayerS
{
    id: string;
    attributes: {
        idUser: number;
        dateEnd: string;
        dateInit: string;
        hourInit: string;
        HourEnd: string;
        allDays: boolean;
        updatedAt: string;
        createdAt: string;
        publishedAt: string;
        motivo: string;
    };
}

export interface estudio
{
    id: string;
    attributes: {
        text: string;
        user_id: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        id_curso: string;
    };
}
