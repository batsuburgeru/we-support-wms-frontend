import * as React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect, Circle } from "react-native-svg";

// Check Icon
export const Check = (props) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <G clipPath="url(#clip0_102_702)">
      <Path
        d="M14.1991 6.3356C14.5036 7.8298 14.2866 9.38322 13.5843 10.7368C12.8821 12.0904 11.737 13.1623 10.3401 13.7738C8.9432 14.3853 7.37886 14.4995 5.90797 14.0972C4.43709 13.6949 3.14857 12.8005 2.25729 11.5632C1.36601 10.3259 0.925853 8.82043 1.01021 7.29786C1.09458 5.77529 1.69836 4.32766 2.72087 3.19639C3.74339 2.06511 5.12283 1.31856 6.62915 1.08124C8.13547 0.843922 9.67763 1.13018 10.9984 1.89227"
        stroke="#EBF4ED"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 7.33334L8 9.33334L14.6667 2.66667"
        stroke="#EBF4ED"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_102_702">
        <Path d="M0 0H16V6C16 11.5228 11.5228 16 6 16H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// Approved Request Icon
export const ApprovedRequest = (props) => (
  <Svg width={27} height={27} viewBox="0 0 27 27" fill="none" {...props}>
    <Path
      d="M24.5262 11.25C25.04 13.7714 24.6738 16.3928 23.4888 18.677C22.3037 20.9612 20.3714 22.77 18.0141 23.802C15.6568 24.8339 13.017 25.0265 10.5349 24.3477C8.05277 23.6688 5.87839 22.1596 4.37436 20.0716C2.87033 17.9836 2.12756 15.4431 2.26992 12.8738C2.41228 10.3045 3.43117 7.86159 5.15666 5.95256C6.88215 4.04352 9.20995 2.78372 11.7519 2.38325C14.2938 1.98277 16.8962 2.46583 19.1251 3.75186"
      stroke="#EB5E28"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.125 12.375L13.5 15.75L24.75 4.5"
      stroke="#EB5E28"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Arrow Icon
export const Arrow = (props) => (
  <Svg width={8} height={14} viewBox="0 0 8 14" fill="none" {...props}>
    <Path
      d="M1 13L7 7L1 1"
      stroke="#EB5E28"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Cancel Icon
export const Cancels = (props) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <G clipPath="url(#clip0_102_733)">
      <Path
        d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00001C14.6668 4.31811 11.6821 1.33334 8.00016 1.33334C4.31826 1.33334 1.3335 4.31811 1.3335 8.00001C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z"
        stroke="#F4F3EB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.2666 3.26666L12.7333 12.7333"
        stroke="#F4F3EB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_102_733">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

// Cancelled Request Icon
export const CancelledRequest = (props) => (
  <Svg width={27} height={27} viewBox="0 0 27 27" fill="none" {...props}>
    <Path
      d="M13.5 24.75C19.7132 24.75 24.75 19.7132 24.75 13.5C24.75 7.2868 19.7132 2.25 13.5 2.25C7.2868 2.25 2.25 7.2868 2.25 13.5C2.25 19.7132 7.2868 24.75 13.5 24.75Z"
      stroke="#EB5E28"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.51245 5.51251L21.4875 21.4875"
      stroke="#EB5E28"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

//Denys
export const Denys = (props) => (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.0002 2H2.00016C1.63197 2 1.3335 2.29848 1.3335 2.66667V4.66667C1.3335 5.03486 1.63197 5.33333 2.00016 5.33333H14.0002C14.3684 5.33333 14.6668 5.03486 14.6668 4.66667V2.66667C14.6668 2.29848 14.3684 2 14.0002 2Z"
        stroke="#F4EBEB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.6665 5.33334V12.6667C2.6665 13.0203 2.80698 13.3594 3.05703 13.6095C3.30708 13.8595 3.64622 14 3.99984 14H11.9998C12.3535 14 12.6926 13.8595 12.9426 13.6095C13.1927 13.3594 13.3332 13.0203 13.3332 12.6667V5.33334"
        stroke="#F4EBEB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.3335 11.3333L9.66683 8"
        stroke="#F4EBEB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.3335 8L9.66683 11.3333"
        stroke="#F4EBEB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  //DeniedRequest
  export const DeniedRequest = (props) => (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.625 3.375H3.375C2.75368 3.375 2.25 3.87868 2.25 4.5V7.875C2.25 8.49632 2.75368 9 3.375 9H23.625C24.2463 9 24.75 8.49632 24.75 7.875V4.5C24.75 3.87868 24.2463 3.375 23.625 3.375Z"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.5 9V21.375C4.5 21.9717 4.73705 22.544 5.15901 22.966C5.58097 23.3879 6.15326 23.625 6.75 23.625H20.25C20.8467 23.625 21.419 23.3879 21.841 22.966C22.2629 22.544 22.5 21.9717 22.5 21.375V9"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6875 19.125L16.3125 13.5"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.6875 13.5L16.3125 19.125"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  //PendingRequest
  export const PendingRequest = (props) => (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.5 2.25V6.75"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.225 8.77501L21.4875 5.51251"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.25 13.5H24.75"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.225 18.225L21.4875 21.4875"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5 20.25V24.75"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.51245 21.4875L8.77495 18.225"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.25 13.5H6.75"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.51245 5.51251L8.77495 8.77501"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  //TotalRequest
  export const TotalRequest = (props) => (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.875 13.5H3.375"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.125 20.25H3.375"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.625 6.75H3.375"
        stroke="#EB5E28"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );


  //Dashboard
  export const Dashboard = (props) => (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.375 4.125H5.5C4.74061 4.125 4.125 4.74061 4.125 5.5V15.125C4.125 15.8844 4.74061 16.5 5.5 16.5H12.375C13.1344 16.5 13.75 15.8844 13.75 15.125V5.5C13.75 4.74061 13.1344 4.125 12.375 4.125Z"
        stroke="#B5B5B5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.5 4.125H20.625C19.8656 4.125 19.25 4.74061 19.25 5.5V9.625C19.25 10.3844 19.8656 11 20.625 11H27.5C28.2594 11 28.875 10.3844 28.875 9.625V5.5C28.875 4.74061 28.2594 4.125 27.5 4.125Z"
        stroke="#B5B5B5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M27.5 16.5H20.625C19.8656 16.5 19.25 17.1156 19.25 17.875V27.5C19.25 28.2594 19.8656 28.875 20.625 28.875H27.5C28.2594 28.875 28.875 28.2594 28.875 27.5V17.875C28.875 17.1156 28.2594 16.5 27.5 16.5Z"
        stroke="#B5B5B5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.375 22H5.5C4.74061 22 4.125 22.6156 4.125 23.375V27.5C4.125 28.2594 4.74061 28.875 5.5 28.875H12.375C13.1344 28.875 13.75 28.2594 13.75 27.5V23.375C13.75 22.6156 13.1344 22 12.375 22Z"
        stroke="#B5B5B5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

//Requests
export const Requests = (props) => (
  <Svg
    width={33}
    height={33}
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.125 23.375L6.875 26.125L12.375 20.625"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.125 9.625L6.875 12.375L12.375 6.875"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.875 8.25H28.875"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.875 16.5H28.875"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.875 24.75H28.875"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


//History
export const History = (props) => (
  <Svg
    width={33}
    height={33}
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.125 16.5C4.125 18.9475 4.85078 21.3401 6.21056 23.3752C7.57035 25.4102 9.50306 26.9964 11.7643 27.933C14.0255 28.8696 16.5137 29.1147 18.9142 28.6372C21.3148 28.1597 23.5198 26.9811 25.2504 25.2504C26.9811 23.5198 28.1597 21.3148 28.6372 18.9142C29.1147 16.5137 28.8696 14.0255 27.933 11.7643C26.9964 9.50306 25.4102 7.57035 23.3752 6.21056C21.3401 4.85078 18.9475 4.125 16.5 4.125C13.0404 4.13801 9.71983 5.48793 7.2325 7.8925L4.125 11"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.125 4.125V11H11"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 9.625V16.5L22 19.25"
      stroke="#B5B5B5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

//FDashboard
export const FDashboard = (props) => (
  <Svg
    width={33}
    height={33}
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.375 4.125H5.5C4.74061 4.125 4.125 4.74061 4.125 5.5V15.125C4.125 15.8844 4.74061 16.5 5.5 16.5H12.375C13.1344 16.5 13.75 15.8844 13.75 15.125V5.5C13.75 4.74061 13.1344 4.125 12.375 4.125Z"
      stroke="#EB5E28"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27.5 4.125H20.625C19.8656 4.125 19.25 4.74061 19.25 5.5V9.625C19.25 10.3844 19.8656 11 20.625 11H27.5C28.2594 11 28.875 10.3844 28.875 9.625V5.5C28.875 4.74061 28.2594 4.125 27.5 4.125Z"
      stroke="#282828"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27.5 16.5H20.625C19.8656 16.5 19.25 17.1156 19.25 17.875V27.5C19.25 28.2594 19.8656 28.875 20.625 28.875H27.5C28.2594 28.875 28.875 28.2594 28.875 27.5V17.875C28.875 17.1156 28.2594 16.5 27.5 16.5Z"
      stroke="#EB5E28"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.375 22H5.5C4.74061 22 4.125 22.6156 4.125 23.375V27.5C4.125 28.2594 4.74061 28.875 5.5 28.875H12.375C13.1344 28.875 13.75 28.2594 13.75 27.5V23.375C13.75 22.6156 13.1344 22 12.375 22Z"
      stroke="#282828"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


//FRequests
export const FRequests = (props) => (
  <Svg
    width={33}
    height={33}
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.125 23.375L6.875 26.125L12.375 20.625"
      stroke="#EB5E28"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.125 9.625L6.875 12.375L12.375 6.875"
      stroke="#EB5E28"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.875 8.25H28.875"
      stroke="#282828"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.875 16.5H28.875"
      stroke="#F97333"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.875 24.75H28.875"
      stroke="#282828"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);



//FHistory
export const FHistory = (props) => (
    <Svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.125 16.5C4.125 18.9475 4.85078 21.3401 6.21056 23.3752C7.57035 25.4102 9.50306 26.9964 11.7643 27.933C14.0255 28.8696 16.5137 29.1147 18.9142 28.6372C21.3148 28.1597 23.5198 26.9811 25.2504 25.2504C26.9811 23.5198 28.1597 21.3148 28.6372 18.9142C29.1147 16.5137 28.8696 14.0255 27.933 11.7643C26.9964 9.50306 25.4102 7.57035 23.3752 6.21056C21.3401 4.85078 18.9475 4.125 16.5 4.125C13.0404 4.13801 9.71983 5.48793 7.2325 7.8925L4.125 11"
        stroke="#EB5E28"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.125 4.125V11H11"
        stroke="#EB5E28"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 9.625V16.5L22 19.25"
        stroke="#282828"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );


  //Back
export const Back = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20 8L12 16L20 24"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

//QR
export const QRScan = (props) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_849_899)">
      <Path
        d="M0 1.25C0 0.918479 0.131696 0.600537 0.366117 0.366117C0.600537 0.131696 0.918479 0 1.25 0L8.75 0C9.08152 0 9.39946 0.131696 9.63388 0.366117C9.8683 0.600537 10 0.918479 10 1.25C10 1.58152 9.8683 1.89946 9.63388 2.13388C9.39946 2.3683 9.08152 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 9.08152 2.3683 9.39946 2.13388 9.63388C1.89946 9.8683 1.58152 10 1.25 10C0.918479 10 0.600537 9.8683 0.366117 9.63388C0.131696 9.39946 0 9.08152 0 8.75V1.25ZM30 1.25C30 0.918479 30.1317 0.600537 30.3661 0.366117C30.6005 0.131696 30.9185 0 31.25 0L38.75 0C39.0815 0 39.3995 0.131696 39.6339 0.366117C39.8683 0.600537 40 0.918479 40 1.25V8.75C40 9.08152 39.8683 9.39946 39.6339 9.63388C39.3995 9.8683 39.0815 10 38.75 10C38.4185 10 38.1005 9.8683 37.8661 9.63388C37.6317 9.39946 37.5 9.08152 37.5 8.75C37.5 5.29822 34.7018 2.5 31.25 2.5C30.9185 2.5 30.6005 2.3683 30.3661 2.13388C30.1317 1.89946 30 1.58152 30 1.25ZM1.25 30C1.58152 30 1.89946 30.1317 2.13388 30.3661C2.3683 30.6005 2.5 30.9185 2.5 31.25C2.5 34.7018 5.29822 37.5 8.75 37.5C9.08152 37.5 9.39946 37.6317 9.63388 37.8661C9.8683 38.1005 10 38.4185 10 38.75C10 39.0815 9.8683 39.3995 9.63388 39.6339C9.39946 39.8683 9.08152 40 8.75 40H1.25C0.918479 40 0.600537 39.8683 0.366117 39.6339C0.131696 39.3995 0 39.0815 0 38.75V31.25C0 30.9185 0.131696 30.6005 0.366117 30.3661C0.600537 30.1317 0.918479 30 1.25 30ZM38.75 30C39.0815 30 39.3995 30.1317 39.6339 30.3661C39.8683 30.6005 40 30.9185 40 31.25V38.75C40 39.0815 39.8683 39.3995 39.6339 39.6339C39.3995 39.8683 39.0815 40 38.75 40H31.25C30.9185 40 30.6005 39.8683 30.3661 39.6339C30.1317 39.3995 30 39.0815 30 38.75C30 38.4185 30.1317 38.1005 30.3661 37.8661C30.6005 37.6317 30.9185 37.5 31.25 37.5C34.7018 37.5 37.5 34.7018 37.5 31.25C37.5 30.9185 37.6317 30.6005 37.8661 30.3661C38.1005 30.1317 38.4185 30 38.75 30ZM10 11.25C10 10.5596 10.5596 10 11.25 10C11.9404 10 12.5 10.5596 12.5 11.25C12.5 11.9404 11.9404 12.5 11.25 12.5C10.5596 12.5 10 11.9404 10 11.25Z"
        fill="#333333"
      />
      <Path
        d="M17.5 5H5V17.5H17.5V5ZM7.5 7.5H15V15H7.5V7.5ZM12.5 27.5H10V30H12.5V27.5Z"
        fill="white"
      />
      <Path
        d="M17.5 22.5H5V35H17.5V22.5ZM7.5 25H15V32.5H7.5V25ZM27.5 10H30V12.5H27.5V10Z"
        fill="white"
      />
      <Path
        d="M22.5 5H35V17.5H22.5V5ZM25 7.5V15H32.5V7.5H25ZM20 20V25H22.5V27.5H20V30H25V25H27.5V30H30V27.5H35V25H27.5V20H20ZM25 25H22.5V22.5H25V25ZM35 30H32.5V32.5H27.5V35H35V30ZM25 35V32.5H20V35H25Z"
        fill="white"
      />
      <Path d="M30 22.5H35V20H30V22.5Z" fill="white" />
      <Circle cx={11.2223} cy={11.2222} r={1.44444} fill="white" />
      <Path
        d="M0.777832 20L39.5556 19.6667"
        stroke="#333333"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_849_899">
        <Rect width={40} height={40} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);


//DashboardIcon QRScan

export const DQRScan = (props) => (
  <Svg
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.8333 0H0V20.8333H20.8333V0ZM4.16667 4.16667H16.6667V16.6667H4.16667V4.16667ZM12.5 37.5H8.33333V41.6667H12.5V37.5Z"
      fill="black"
    />
    <Path
      d="M20.8333 29.1666H0V50H20.8333V29.1666ZM4.16667 33.3333H16.6667V45.8333H4.16667V33.3333ZM37.5 8.33331H41.6667V12.5H37.5V8.33331Z"
      fill="black"
    />
    <Path
      d="M29.1667 0H50V20.8333H29.1667V0ZM33.3333 4.16667V16.6667H45.8333V4.16667H33.3333ZM25 25V33.3333H29.1667V37.5H25V41.6667H33.3333V33.3333H37.5V41.6667H41.6667V37.5H50V33.3333H37.5V25H25ZM33.3333 33.3333H29.1667V29.1667H33.3333V33.3333ZM50 41.6667H45.8333V45.8333H37.5V50H50V41.6667ZM33.3333 50V45.8333H25V50H33.3333Z"
      fill="black"
    />
    <Circle cx={10.3703} cy={10.3704} r={2.40741} fill="black" />
  </Svg>
);

//DashboardIcon QRHistory
export const DQRHistory = (props) => (
  <Svg
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.25 25C6.25 28.7084 7.34967 32.3335 9.40995 35.4169C11.4702 38.5004 14.3986 40.9036 17.8247 42.3227C21.2508 43.7419 25.0208 44.1132 28.6579 43.3897C32.2951 42.6663 35.636 40.8805 38.2582 38.2582C40.8805 35.636 42.6663 32.2951 43.3897 28.6579C44.1132 25.0208 43.7419 21.2508 42.3227 17.8247C40.9036 14.3986 38.5004 11.4702 35.4169 9.40995C32.3335 7.34967 28.7084 6.25 25 6.25C19.7582 6.26972 14.727 8.31505 10.9583 11.9583L6.25 16.6667"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.25 6.25V16.6667H16.6667"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25 14.5833V25L33.3333 29.1666"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

//DashboardIcon DLogout
export const DLogout = (props) => (
  <Svg
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.75 43.75H10.4167C9.3116 43.75 8.25179 43.311 7.47039 42.5296C6.68899 41.7482 6.25 40.6884 6.25 39.5833V10.4167C6.25 9.3116 6.68899 8.25179 7.47039 7.47039C8.25179 6.68899 9.3116 6.25 10.4167 6.25H18.75"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M33.3333 35.4166L43.7499 25L33.3333 14.5833"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M43.75 25H18.75"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

