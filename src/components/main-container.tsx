import { useState } from "react";

import AgeTab from "@/components/age-tab";
import BirthYearTab from "@/components/birth-year-tab";
import Footer from "@/components/common/footer";
import MemoPad from "@/components/memo-pad";
import Tabs, { type TabId } from "@/components/tabs";

export default function MainContainer() {
  const [activeTab, setActiveTab] = useState<TabId>("age");
  const [memo, setMemo] = useState("");

  const addToMemo = (text: string) => {
    if (memo.trim() === "") {
      setMemo(text);
    } else {
      setMemo(`${memo}\n${text}`);
    }
  };

  return (
    <main className="my-5 flex min-h-screen flex-col gap-4 lg:flex-row lg:items-start lg:justify-center">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "age" ? (
          <AgeTab onAddToMemo={addToMemo} />
        ) : (
          <BirthYearTab />
        )}
      </Tabs>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4 lg:mx-0 lg:max-w-md">
        <MemoPad memo={memo} setMemo={setMemo} />
        <Footer />
      </div>
    </main>
  );
}
