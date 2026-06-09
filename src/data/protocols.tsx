import React from "react";

export interface ProtocolItem {
  id: string;
  label: React.ReactNode;
  icon: React.ReactNode;
}

export const PROT_ITEMS: ProtocolItem[] = [
  {
    id: "solana",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        solana
      </span>
    ),
    icon: (
      <svg className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] md:w-[21px] md:h-[21px] lg:w-[26px] lg:h-[26px] xl:w-[31px] xl:h-[31px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="m23.8764 18.0313-3.962 4.1393a.9201.9201 0 0 1-.306.2106.9407.9407 0 0 1-.367.0742H.4599a.4689.4689 0 0 1-.2522-.0733.4513.4513 0 0 1-.1696-.1962.4375.4375 0 0 1-.0314-.2545.4438.4438 0 0 1 .117-.2298l3.9649-4.1393a.92.92 0 0 1 .3052-.2102.9407.9407 0 0 1 .3658-.0746H23.54a.4692.4692 0 0 1 .2523.0734.4531.4531 0 0 1 .1697.196.438.438 0 0 1 .0313.2547.4442.4442 0 0 1-.1169.2297zm-3.962-8.3355a.9202.9202 0 0 0-.306-.2106.941.941 0 0 0-.367-.0742H.4599a.4687.4687 0 0 0-.2522.0734.4513.4513 0 0 0-.1696.1961.4376.4376 0 0 0-.0314.2546.444.444 0 0 0 .117.2297l3.9649 4.1394a.9204.9204 0 0 0 .3052.2102c.1154.049.24.0744.3658.0746H23.54a.469.469 0 0 0 .2523-.0734.453.453 0 0 0 .1697-.1961.4382.4382 0 0 0 .0313-.2546.4444.4444 0 0 0-.1169-.2297zM.46 6.7225h18.7815a.9411.9411 0 0 0 .367-.0742.9202.9202 0 0 0 .306-.2106l3.962-4.1394a.4442.4442 0 0 0 .117-.2297.4378.4378 0 0 0-.0314-.2546.453.453 0 0 0-.1697-.196.469.469 0 0 0-.2523-.0734H4.7596a.941.941 0 0 0-.3658.0745.9203.9203 0 0 0-.3052.2102L.1246 5.9687a.4438.4438 0 0 0-.1169.2295.4375.4375 0 0 0 .0312.2544.4512.4512 0 0 0 .1692.196.4689.4689 0 0 0 .2518.0739z" />
      </svg>
    )
  },
  {
    id: "jup",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        jupiter
      </span>
    ),
    icon: (
      <svg className="w-[13px] h-[13px] sm:w-[18px] sm:h-[18px] md:w-[24px] md:h-[24px] lg:w-[30px] lg:h-[30px] xl:w-[36px] xl:h-[36px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 80 800 640" fill="currentColor">
        <path d="M536,568.9c-66.8-108.5-166.4-170-289.4-195.6c-43.5-9-87.2-8.9-129.4,7.7c-28.9,11.4-33.3,23.4-19.7,53.7 c92.4-21.9,178.4-1.5,258.9,45c81.1,46.9,141.6,112.2,169.1,205c38.6-11.8,43.6-18.3,34.3-54.2C554.3,609.4,547.4,587.4,536,568.9 L536,568.9z" />
        <path d="M609.1,480.6c-85.8-125-207.3-194.9-355.8-218.3c-39.3-6.2-79.4-4.5-116.2,14.3c-17.6,9-33.2,20.5-37.4,44.9 c115.8-31.9,219.7-3.7,317.5,53c98.3,57,175.1,133.5,205,251.1c20.8-18.4,24.5-41,19.1-62C633.9,534.8,625.5,504.5,609.1,480.6 L609.1,480.6z" />
        <path d="M105,488.6c7.3,16.2,12.1,34.5,23,47.6c5.5,6.7,22.2,4.1,33.8,5.7c1.8,0.2,3.6,0.5,5.4,0.7 c102.9,15.3,184.1,65.1,242.1,152c3.4,5.1,8.9,12.7,13.4,12.7c17.4-0.1,34.9-2.8,52.5-4.5C449,557.5,232.8,438.3,105,488.6 L105,488.6z" />
        <path d="M656.6,366.7C599.9,287.4,521.7,234.6,432.9,197c-61.5-26.1-125.2-41.8-192.8-33.7 c-23.4,2.8-45.3,9.5-63.4,24.7c230.9,5.8,404.6,105.8,524,303.3c0.2-13.1,2.2-27.7-2.6-39.5C686.1,422.5,674.7,392,656.6,366.7z" />
        <path d="M709.8,325.3c-47-178.9-238-265-379.2-221.4C482.7,133.9,607.5,206.4,709.8,325.3z" />
        <path d="M155.4,583.9c54.6,69.3,124,109.7,213,122.8C334.4,643.2,214.6,574.5,155.4,583.9L155.4,583.9z" />
      </svg>
    )
  },
  {
    id: "jito",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        jito
      </span>
    ),
    icon: (
      <svg className="w-[11px] h-[13px] sm:w-[15px] sm:h-[18px] md:w-[20px] md:h-[24px] lg:w-[25px] lg:h-[30px] xl:w-[30px] xl:h-[36px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5,21.5 C2.5,14 7,9 13,9 C13.5,9 14,9.2 14,9.8 C14,15.5 10,21.5 2.5,21.5 Z" />
        <path d="M7.5,21.5 C7.5,16 11,12 16.5,12 C17,12 17.5,12.2 17.5,12.8 C17.5,17.5 14,21.5 7.5,21.5 Z" opacity="0.8" />
        <path d="M12.5,21.5 C12.5,18 15,15 19.5,15 C20,15 20.5,15.2 20.5,15.8 C20.5,19 18,21.5 12.5,21.5 Z" opacity="0.6" />
      </svg>
    )
  },
  {
    id: "arcium",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        arcium
      </span>
    ),
    icon: (
      <svg className="w-[13px] h-[13px] sm:w-[18px] sm:h-[18px] md:w-[24px] md:h-[24px] lg:w-[30px] lg:h-[30px] xl:w-[36px] xl:h-[36px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3 L3 21 M12 3 L21 21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11 L7 21 M12 11 L17 21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    )
  },
  {
    id: "token2022",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        token-2022
      </span>
    ),
    icon: null
  },
  {
    id: "zk",
    label: (
      <span className="font-sans text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] tracking-[0.22em] font-normal text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300">
        ZK
      </span>
    ),
    icon: (
      <svg className="w-[11px] h-[11px] sm:w-[15px] sm:h-[15px] md:w-[21px] md:h-[21px] lg:w-[27px] lg:h-[27px] xl:w-[32px] xl:h-[32px] flex-shrink-0 text-[#EDEAE2]/45 group-hover:text-[#EDEAE2]/90 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" strokeOpacity="0.3" />
        <path d="M12 22V12M3 7l9 5 9-5" strokeOpacity="0.4" />
        <path d="M12 8l4 2.25v4.5L12 17l-4-2.25v-4.5L12 8z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.8" />
      </svg>
    )
  }
];
