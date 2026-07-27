"use client";

import { useState } from "react";

import ApplyHeader from "@/components/applications/ApplyHeader";
import ApplicantSection from "@/components/applications/ApplicantSection";
import AttachmentSection from "@/components/applications/AttachmentSection";
import CompleteDialog from "@/components/applications/CompleteDialog";
import AgreementSection from "@/components/applications/AgreementSection";
import ProductSection from "@/components/applications/ProductSection";
import ShowroomSection from "@/components/applications/ShowroomSection";
import SubmitSection from "@/components/applications/SubmitSection";

export default function ApplyPage() {
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO:
    // FastAPIへPOST
    // 正常終了したらダイアログ表示

    setOpenCompleteDialog(true);
  };

  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <ApplyHeader />

        <form onSubmit={handleSubmit} className="space-y-8">
          <ShowroomSection />

          <ApplicantSection />

          <ProductSection />

          <AttachmentSection />

          <AgreementSection />

          <SubmitSection />
        </form>
      </main>

      <CompleteDialog
        open={openCompleteDialog}
        applicationNo="SR-20260727-000001"
        onClose={() => setOpenCompleteDialog(false)}
      />
    </>
  );
}
