"use client";

import AdminSection from "../../components/Menu/AdminSection/AdminSection";
import SectionLayout from "../../components/SectionLayout/SectionLayout";

export default function AdministratorPage() {
    return (
        <SectionLayout title="Strona administratora" sectionId="administrator">
            <AdminSection />
        </SectionLayout>
    );
}
