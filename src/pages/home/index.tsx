import { useOutletContext } from "react-router-dom";
import HeaderBanner from "../../components/sections/bannerSection";
import ContinueLearningSection from "../../components/sections/continueLearningSection";
import StartLearningSection from "../../components/sections/startLearningSection";
import { useAuth } from "../../context/AuthContext";

type LayoutContext = {
  setModalType: (type: "login" | "profile" | "signup" | null) => void;
  setSidebarOpen: (value: boolean) => void;
};

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { setModalType, setSidebarOpen } = useOutletContext<LayoutContext>();

  return (
    <>
      <HeaderBanner />

      {!isAuthenticated && <StartLearningSection />}

      <ContinueLearningSection
        onLogin={() => setModalType("login")}
        onSeeAll={() => setSidebarOpen(true)}
      />

      {isAuthenticated && <StartLearningSection />}
    </>
  );
}
