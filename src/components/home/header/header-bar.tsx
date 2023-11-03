"use client";

import HeaderBase from "@/components/common/header-base";
import ResponsiveLogo from "@/components/common/responsive-logo";
import { Icons } from "@/components/icons";
import { Button } from "@/ui/button";
import { useState } from "react";
import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";

export function HeaderBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderBase>
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <Button variant="outline" size="icon" onClick={toggleMenu}>
                <Icons.menu />
              </Button>
            </div>
            <ResponsiveLogo />
          </div>
          <div>
            <div className="absolute right-1/2 translate-x-1/2 hidden sm:block">
              <HeaderLinks toggleMenu={toggleMenu} />
            </div>
            <HeaderActions />
          </div>
        </div>

        {isMenuOpen && (
          <div className="block sm:hidden">
            <HeaderLinks toggleMenu={toggleMenu} />
          </div>
        )}
      </div>
    </HeaderBase>
  );
}
