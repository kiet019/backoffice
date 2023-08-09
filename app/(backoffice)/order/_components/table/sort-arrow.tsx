import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Link from 'next/link';
import FlexBox from '@/components/mui/flex-box/flex-box';

interface Props {
    hidden?: boolean,
    status?: boolean,
    href: string
}
export const SortIcon = ({ hidden = false, status = false, href }: Props) => {
    return (
        <Link href={href} style={{
            display: hidden ? "none" : "inline-block",
            marginLeft: "5px",
            height: "fit-content"
        }}>
            <FlexBox alignItems="center">{status ? <ArrowDownwardIcon fontSize='small' /> : <ArrowUpwardIcon fontSize='small' />}</FlexBox>
        </Link>
    )
}