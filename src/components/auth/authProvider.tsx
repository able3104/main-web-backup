import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User, Auth } from "firebase/auth";
import { auth } from "../../firebase/config";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  authInstance: Auth; // auth 객체도 context를 통해 전달
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context를 쉽게 사용하기 위한 Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Context Provider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 처음엔 로딩 상태

  useEffect(() => {
    // Firebase Auth 상태 변경 리스너
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // 상태 확인 완료
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    authInstance: auth,
  };

  // 로딩 중이 아닐 때만 자식 컴포넌트 렌더링
  // (또는 로딩 스피너를 보여줄 수도 있습니다)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
