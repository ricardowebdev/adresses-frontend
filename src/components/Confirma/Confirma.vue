<template>
	<Alert :msg="msg" :type="type" :time="time" :callback="callBack" @clearAlert="clearAlert" />
    <Loader :showLoader="showLoader" />
	<v-container class="d-flex flex-column flex-wrap">
		<v-card id="menu-card" rounded-lg>
			<v-row>
				<v-col class="main-col">
					<v-card-title justify="center" class="flex-row" font-size="16">
						<v-row justify="center" no-gutters class="mt-6">
							<b>{{ processMsg }}</b>
						</v-row>
            		</v-card-title>
					<v-container>
						<v-row justify="center" no-gutters class="mt-6">
							<router-link to="/" class="mr-4">
								<v-btn color="#ffbd1e" rounded-lg>
									<b>Login</b>
								</v-btn>
							</router-link>                    
						</v-row>          
					</v-container>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>


<style>
</style>
<script lang="ts" src="./Confirma.ts" />
