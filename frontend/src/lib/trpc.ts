import { createTRPCReact } from '@trpc/react-query'
import type {appRouter} from '../../../backend/router'

export const trpc = createTRPCReact<appRouter>();
