import * as React from "react";
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

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
