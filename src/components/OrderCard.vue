<template>
    <div  class="w-64 text-white mb-3" style="max-width: 18rem;">
        <!-- TODO: bg-color depends on order status -->
        <div class="card-header bg-warning relative">
            <p class="text-xl">18:43</p>
            <h5 class="text-xl">#34</h5>
            <div class="absolute inset-y-3 right-5 flex space-x-2">
                <svg style="width:25px" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fillRule="evenodd"
                        d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd" />
                </svg>
                <svg style="width:25px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <svg style="width:25px" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd" /></svg>
                <svg style="width:25px" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                        d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                        clipRule="evenodd" /></svg>
            </div>
        </div>
        <div class="card-body border bg-light text-black overflow-y-auto max-h-64">
            <table class="table">
            <tr>
                <td>2x Carpaccio</td>
            </tr>
            <tr>
                <td>1x Tomato Soup</td>
            </tr>
            <tr>
                <td>1x Bread</td>
            </tr>
            </table>
        </div>
    </div>
</template>


<script>
    export default {

    }
</script>