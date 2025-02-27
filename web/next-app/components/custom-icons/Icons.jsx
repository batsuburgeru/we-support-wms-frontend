export function AllOrders() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#CAF1FF" />
            <circle cx="16" cy="16" r="9" stroke="#0F5FC2" strokeWidth="2" />
            <path d="M11.5 15.5V15.5C11.5 16.3284 12.1716 17 13 17H13.3377C13.7332 17 14.0844 17.2531 14.2094 17.6283L14.25 17.75C14.2711 17.8133 14.2816 17.8449 14.2929 17.873C14.437 18.2314 14.7747 18.4748 15.1603 18.4982C15.1905 18.5 15.2239 18.5 15.2906 18.5H16.7094C16.7761 18.5 16.8095 18.5 16.8397 18.4982C17.2253 18.4748 17.563 18.2314 17.7071 17.873C17.7184 17.8449 17.7289 17.8133 17.75 17.75L17.7906 17.6283C17.9156 17.2531 18.2668 17 18.6623 17H19C19.8284 17 20.5 16.3284 20.5 15.5V15.5" stroke="#0F5FC2" />
            <path d="M14 14.5L16 16M16 16L18 14.5M16 16L16 11" stroke="#0F5FC2" />
            <path d="M18 12.5V12.5C18.4647 12.5 18.697 12.5 18.8902 12.5384C19.6836 12.6962 20.3038 13.3164 20.4616 14.1098C20.5 14.303 20.5 14.5353 20.5 15V16.5C20.5 18.3856 20.5 19.3284 19.9142 19.9142C19.3284 20.5 18.3856 20.5 16.5 20.5H15.5C13.6144 20.5 12.6716 20.5 12.0858 19.9142C11.5 19.3284 11.5 18.3856 11.5 16.5V15C11.5 14.5353 11.5 14.303 11.5384 14.1098C11.6962 13.3164 12.3164 12.6962 13.1098 12.5384C13.303 12.5 13.5353 12.5 14 12.5V12.5" stroke="#0F5FC2" />
        </svg>
    );
}

export function ApprovedRequests() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#DDFFE7" />
            <circle cx="16" cy="16" r="9" stroke="#27C153" strokeWidth="2" />
            <path d="M12 16L15 19L20 13" stroke="#27C153" strokeWidth="2" />
        </svg>
    );
}

export function DeniedRequests() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#FFEBEA" />
            <circle cx="16" cy="16" r="9" stroke="#FF4437" strokeWidth="2" />
            <path d="M12 19.9994L20 11.9999" stroke="#FF4437" strokeWidth="2" />
            <path d="M20 20L12 12.0005" stroke="#FF4437" strokeWidth="2" />
        </svg>
    )
}

export function PendingRequests() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#FFF2E5" />
            <circle cx="16" cy="16" r="9" stroke="#F49A40" stroke-width="2" />
            <g clip-path="url(#clip0_191_689)">
                <path d="M16 11V13" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.1001 13.9L19.5501 12.45" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 16H21" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.1001 18.1L19.5501 19.55" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 19V21" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.45 19.55L13.9 18.1" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11 16H13" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.45 12.45L13.9 13.9" stroke="#F49A40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_191_689">
                    <rect width="12" height="12" fill="white" transform="translate(10 10)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function ReturnedRequests() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#F4EBE3" />
            <g clip-path="url(#clip0_186_783)">
                <path d="M14.3334 12.25L12.6667 13.9167L14.3334 15.5833" stroke="#E2AF2F" stroke-opacity="0.94902" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.6667 13.9166H19.3334" stroke="#E2AF2F" stroke-opacity="0.94902" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.6667 19.75L19.3334 18.0833L17.6667 16.4166" stroke="#E2AF2F" stroke-opacity="0.94902" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19.3334 18.0834H12.6667" stroke="#E2AF2F" stroke-opacity="0.94902" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <circle cx="16" cy="16" r="9" stroke="#E2AF2F" strokeWidth="2" />
            <defs>
                <clipPath id="clip0_186_783">
                    <rect width="10" height="10" fill="white" transform="translate(11 11)" />
                </clipPath>
            </defs>
        </svg>
    );
}
