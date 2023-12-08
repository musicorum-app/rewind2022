import { SVGProps } from 'react'

export default function LabelArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.38898 6.98509C0.625619 6.16891 0.679179 4.88555 1.50789 4.13581L5.50804 0.516882C5.87575 0.184209 6.35394 0 6.84981 0H7V12H6.94723C6.39359 12 5.86472 11.7705 5.48654 11.3662L1.38898 6.98509Z"
        fill="var(--color)"
      />
    </svg>
  )
}
