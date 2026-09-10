"use client";

import { ReactNode, useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "../store/store";
import { restoreAdminSession } from "../store/features/authSlice";

interface Props {
  children: ReactNode;
}

function SessionInitializer({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const hasCheckedSession = useRef(false);

  useEffect(() => {
    if (!hasCheckedSession.current) {
      hasCheckedSession.current = true;
      dispatch(restoreAdminSession());
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function StoreProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <SessionInitializer>{children}</SessionInitializer>
    </Provider>
  );
}