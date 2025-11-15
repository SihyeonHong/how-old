import { useState } from "react";

import AgeTab from "@/components/age-tab";
import BirthYearTab from "@/components/birth-year-tab";
import MemoPad from "@/components/memo-pad";
import Tabs, { type TabId } from "@/components/tabs";

export default function MainContainer() {
  const [activeTab, setActiveTab] = useState<TabId>("age");

  return (
    <main className="my-5 space-y-4">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "age" ? <AgeTab /> : <BirthYearTab />}
      </Tabs>
      <MemoPad />
    </main>
  );
}
