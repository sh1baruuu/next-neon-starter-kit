
interface BreadcrumbItemType {
    title: string;
    href: string;
}


interface RegistrationType {
    id?: number;
    petId: number;
    barangay_code: string;
    control_no: number;
    registration_year: number;
    registration_date: string;
    registration_no: string;
}

type RegistrationTableCols = getTableColumns<RegistrationType>;


